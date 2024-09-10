import { expect } from '@playwright/test'
import { BASE_URL } from '../config'
import { loginUser } from '../lib'
import { test } from '../test.setup'

let accessToken: string | null = null

test.beforeEach(async ({ page, request }) => {
  await loginUser(page, request).then((pair) => (accessToken = pair.accessToken))
  await page.goto(`${BASE_URL}/task-boards`)
  await page.context().addInitScript((token) => {
    window.localStorage.setItem('access', token ?? '')
  }, accessToken)
})

test.describe('Task Board', () => {
  test('Create a task board', async ({ page }) => {
    const createTaskBoardModal = page.locator(
      '[aria-labelledby="create-new-task-board-modal-title"]',
    )
    const newBoard = { name: 'New Board', description: 'New Board Description' }

    await page.route('**/api/task-boards', (route) =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify(newBoard),
      }),
    )

    await page.getByTestId('create-new-task-board-button').click()
    await page.getByTestId('board-name-input').fill(newBoard.name)
    await page.getByTestId('board-description-textarea').fill(newBoard.description)

    const createResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/task-boards') && response.status() === 201,
    )

    await page.getByTestId('create-board-form-button').click()

    const createResponse = await createResponsePromise
    expect(createResponse.ok()).toBeTruthy()

    await expect(createTaskBoardModal).not.toBeVisible()
  })

  test('Delete the last task board', async ({ page }) => {
    const deleteButton = page.locator('[data-testid^="delete-task-board-"]').last()

    const dataTestId = await deleteButton.getAttribute('data-testid')
    const boardId = dataTestId?.replace('delete-task-board-button-', '')

    await page.route(`**/api/task-boards/${boardId}`, (route) =>
      route.fulfill({
        status: 204,
      }),
    )

    const deleteResponsePromise = page.waitForResponse(
      (response) =>
        response.url().includes(`/api/task-boards/${boardId}`) && response.status() === 204,
    )

    await deleteButton.click()

    const deleteResponse = await deleteResponsePromise
    expect(deleteResponse.ok()).toBeTruthy()
  })
})
