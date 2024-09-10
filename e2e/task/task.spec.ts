import { expect } from '@playwright/test'
import { BASE_URL } from '../config'
import { loginUser } from '../lib'
import { test } from '../test.setup'

let accessToken: string | null = null
let boardId = ''

test.describe('Task Board Details', () => {
  test.beforeEach(async ({ page, request }) => {
    await loginUser(page, request).then((pair) => (accessToken = pair.accessToken))
    await page.context().addInitScript((token) => {
      window.localStorage.setItem('access', token ?? '')
    }, accessToken)
    await page.goto(`${BASE_URL}/task-boards`)
    await page.waitForLoadState('networkidle')
  })

  test('should create a task', async ({ page }) => {
    const firstTask = page.locator('div.mantine-Grid-inner > div').first()
    const firstTaskId = await firstTask.getAttribute('data-board-id')
    boardId = firstTaskId ?? ''
    await page.goto(`${BASE_URL}/task-boards/${boardId}`)
    await page.waitForLoadState('networkidle')

    const createNewTaskButton = page.getByTestId('create-new-task-button')
    await createNewTaskButton.click()

    const createNewTaskModal = page.locator('section.mantine-Modal-content')
    await expect(createNewTaskModal).toBeVisible()

    const newTask = {
      name: 'New Task',
      description: 'New Task Description',
    }
    const taskNameInput = page.getByTestId('task-name-input')
    const taskDescriptionTextarea = page.getByTestId('task-description-textarea')
    const createTaskButton = page.getByTestId('create-task-button')

    await taskNameInput.fill(newTask.name)
    await taskDescriptionTextarea.fill(newTask.description)

    await page.route('**/api/tasks', (route) =>
      route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          ...newTask,
          task_board_uuid: boardId,
        }),
      }),
    )

    const createTaskResponse = page.waitForResponse(
      (response) => response.url().includes('/api/tasks') && response.status() === 201,
    )

    await createTaskButton.click()

    const response = await createTaskResponse

    expect(response.ok()).toBeTruthy()
    await expect(createNewTaskModal).not.toBeVisible()
  })

  test('should edit a task', async ({ page }) => {
    const firstTask = page.locator('div.mantine-Grid-inner > div').first()
    const firstTaskId = await firstTask.getAttribute('data-board-id')
    boardId = firstTaskId ?? ''
    await page.goto(`${BASE_URL}/task-boards/${boardId}`)
    await page.waitForLoadState('networkidle')

    const task = page.locator('[data-testid^="task-card-"]').last()
    const taskId = await task.getAttribute('data-card-id')
    const editTaskButton = page.getByTestId(`edit-task-button-${taskId}`)

    await editTaskButton.click()

    const updateTaskModal = page.locator('section.mantine-Modal-content')
    const taskNameInput = page.getByTestId('task-name-input')
    const taskDescription = page.getByTestId('task-description-input')
    const taskStatus = page.getByTestId('task-status-select')
    const updateTaskButton = page.getByTestId('update-task-submit-button')

    await expect(updateTaskModal).toBeVisible()

    await taskNameInput.clear()
    await taskNameInput.fill('Updated Task')

    const [description, name, status] = await Promise.all([
      taskNameInput.inputValue(),
      taskDescription.inputValue(),
      taskStatus.inputValue(),
    ])

    await page.route(`**/api/tasks-boards/${taskId}`, async (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          description,
          name,
          status: status?.toUpperCase().replace(/\s+/g, '_'),
        }),
      }),
    )

    await updateTaskButton.click()

    const updateTaskResponse = page.waitForResponse(
      (response) => response.url().includes(`/api/tasks/${taskId}`) && response.status() === 200,
    )

    const response = await updateTaskResponse

    expect(response.ok()).toBeTruthy()
    await expect(updateTaskModal).not.toBeVisible()
  })

  test('should edit task board name', async ({ page }) => {
    const firstTask = page.locator('div.mantine-Grid-inner > div').first()
    const firstTaskId = await firstTask.getAttribute('data-board-id')
    boardId = firstTaskId ?? ''
    await page.goto(`${BASE_URL}/task-boards/${boardId}`)
    await page.waitForLoadState('networkidle')

    const editTaskBoardButton = page.getByTestId('edit-task-board-button')

    await editTaskBoardButton.click()

    const editTaskBoardNameModal = page.locator('section.mantine-Modal-content')
    const editTaskBoardSubmitButton = page.getByTestId('update-task-board-submit-button')
    const taskBoardNameInput = page.getByTestId('task-board-name-input')
    const taskBoardDescription = page.getByTestId('task-board-description-textarea')

    await taskBoardNameInput.clear()
    await taskBoardNameInput.fill('Updated Board')

    const [name, description] = await Promise.all([
      taskBoardNameInput.inputValue(),
      taskBoardDescription.inputValue(),
    ])

    await page.route(`**/api/task-boards/${boardId}`, async (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          description,
          name,
          board_uuid: boardId,
        }),
      }),
    )

    await editTaskBoardSubmitButton.click()

    const updateTaskResponse = page.waitForResponse(
      (response) =>
        response.url().includes(`/api/task-boards/${boardId}`) && response.status() === 200,
    )

    const response = await updateTaskResponse

    expect(response.ok()).toBeTruthy()
    await expect(editTaskBoardNameModal).not.toBeVisible()
  })
})
