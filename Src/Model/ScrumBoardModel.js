const sql = require('../../connection');

async function getScrumboardByDate(teamId, date) {
    const scrumboardQuery = sql`
        SELECT * FROM scrumboards WHERE date = ${date} AND team_id = ${teamId};
    `;
    let scrumboard = await scrumboardQuery;
    scrumboard = scrumboard[0];

    const tasksQuery = sql`
        SELECT * FROM tasks WHERE scrumboard_id = ${scrumboard.id};
    `;
    const tasks = await tasksQuery;

    const subtasksQuery = sql`
        SELECT * FROM sub_tasks WHERE task_id IN (${tasks.map(task => task.id)});
    `;

    const subtasks = await subtasksQuery;

    const tasksWithSubtasks = tasks.map(task => {
        const taskSubtasks = subtasks.filter(subtask => subtask.task_id === task.id);
        return { ...task, subtasks: taskSubtasks };
    });

    return { ...scrumboard, tasks: tasksWithSubtasks };
}
async function getScrumboard(scrumboardId) {
    const scrumboardQuery = sql`
        SELECT * FROM scrumboards WHERE id = ${scrumboardId};
    `;

    const scrumboard = await scrumboardQuery;

    const tasksQuery = sql`
        SELECT * FROM tasks WHERE scrumboard_id = ${scrumboardId};
    `;

    const tasks = await tasksQuery;

    const subtasksQuery = sql`
        SELECT * FROM sub_tasks WHERE task_id IN (${tasks.map(task => task.id)});
    `;

    const subtasks = await subtasksQuery;

    const tasksWithSubtasks = tasks.map(task => {
        const taskSubtasks = subtasks.filter(subtask => subtask.task_id === task.id);
        return { ...task, subtasks: taskSubtasks };
    });

    return { ...scrumboard, tasks: tasksWithSubtasks };
}
async function addScrumboard(scrumboardData) {
    const { date, team_id, isEditable, tasks } = scrumboardData.scrumboard;

    const scrumboardQuery = sql`
        INSERT INTO scrumboards (team_id, isEditable, date)
        VALUES (${team_id}, ${isEditable}, ${date})
            RETURNING id;
    `;

    const [{ id: scrumboardId }] = await scrumboardQuery;

    const taskInsertPromises = tasks.map(async (task, index) => {
        const { title, estimation_time, created_by, position_on_board, subtasks, num_subtasks } = task;

        const taskQuery = sql`
            INSERT INTO tasks (title, estimation_time, created_by, position_on_board, scrumboard_id, num_subtasks)
            VALUES (${title}, ${estimation_time}, ${created_by}, ${position_on_board}, ${scrumboardId}, ${num_subtasks})
                RETURNING id;
        `;

        const [{ id: taskId }] = await taskQuery;

        const subtaskInsertPromises = subtasks.map(async (subtask) => {
            const { title, description, completed } = subtask;

            const subtaskQuery = sql`
                INSERT INTO sub_tasks (task_id, title, description, completed)
                VALUES (${taskId}, ${title}, ${description}, ${completed});
            `;

            await subtaskQuery;
        });

        await Promise.all(subtaskInsertPromises);
    });

    await Promise.all(taskInsertPromises);

    return scrumboardId;
}

module.exports = { addScrumboard, getScrumboard,getScrumboardByDate };
