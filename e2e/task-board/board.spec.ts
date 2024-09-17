import { expect } from '@playwright/test'
import { BASE_URL } from '../config'
import { loginUser } from '../lib'
import { test } from '../test.setup'

let accessToken: string | null = null

test.beforeEach(async ({ page, request }) => {
  await test.step('Login and set up page', async () => {
    await loginUser(page, request).then((pair) => (accessToken = pair.accessToken))
    await page.goto(`${BASE_URL}/task-boards`)
    await page.context().addInitScript((token) => {
      window.localStorage.setItem('access', token ?? '')
    }, accessToken)
  })
})

test.describe('Task Board', () => {
  test('Create a task board', async ({ page }) => {
    const createTaskBoardModal = page.locator(
      '[aria-labelledby="create-new-task-board-modal-title"]',
    )
    const newBoard = { name: 'New Board', description: 'New Board Description' }

    await test.step('Set up API mock for board creation', async () => {
      await page.route('**/api/task-boards', (route) =>
        route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify(newBoard),
        }),
      )
    })

    await test.step('Open create task board modal', async () => {
      await page.getByTestId('create-new-task-board-button').click()
    })

    await test.step('Fill in board details', async () => {
      await page.getByTestId('board-name-input').fill(newBoard.name)
      await page.getByTestId('board-description-textarea').fill(newBoard.description)
    })

    await test.step('Submit board creation and verify response', async () => {
      const createResponsePromise = page.waitForResponse(
        (response) => response.url().includes('/api/task-boards') && response.status() === 201,
      )

      await page.getByTestId('create-board-form-button').click()

      const createResponse = await createResponsePromise
      expect(createResponse.ok()).toBeTruthy()
    })

    await test.step('Verify modal is closed', async () => {
      await expect(createTaskBoardModal).not.toBeVisible()
    })
  })

  test('Delete the last task board', async ({ page }) => {
    await test.step('Locate the delete button for the last board', async () => {
      const deleteButton = page.locator('[data-testid^="delete-task-board-"]').first()
      const dataTestId = await deleteButton.getAttribute('data-testid')
      const boardId = dataTestId?.replace('delete-task-board-button-', '')

      await test.step('Set up API mock for board deletion', async () => {
        await page.route(`**/api/task-boards/${boardId}`, (route) =>
          route.fulfill({
            status: 204,
          }),
        )
      })

      await test.step('Delete board and verify response', async () => {
        const deleteResponsePromise = page.waitForResponse(
          (response) =>
            response.url().includes(`/api/task-boards/${boardId}`) && response.status() === 204,
        )

        await deleteButton.click()

        const deleteResponse = await deleteResponsePromise
        expect(deleteResponse.ok()).toBeTruthy()
      })
    })
  })
})
