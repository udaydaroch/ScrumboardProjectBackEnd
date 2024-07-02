const sql = require('../../connection');

async function addScrumboard(scrumboardData) {
    const { date, team_id, isEditable, tasks } = scrumboardData.scrumboard;

    const scrumboardQuery = `
        INSERT INTO scrumboards (team_id, isEditable, date)
        VALUES (${team_id}, ${isEditable}, '${date}')
            RETURNING id;
    `;

    const { id: scrumboardId } = await sql.first(scrumboardQuery);

    const taskInsertPromises = tasks.map(async (task, index) => {
        const { title, estimation_time, created_by, position_on_board, subtasks } = task;

        const taskQuery = `
            INSERT INTO tasks (title, estimation_time, created_by, position_on_board, scrumboard_id)
            VALUES ('${title}', ${estimation_time}, ${created_by}, ${position_on_board}, ${scrumboardId})
            RETURNING id;
        `;

        const { id: taskId } = await sql.first(taskQuery);

        const subtaskInsertPromises = subtasks.map(async (subtask) => {
            const { title, description, completed } = subtask;

            const subtaskQuery = `
                INSERT INTO sub_tasks (task_id, title, description, completed)
                VALUES (${taskId}, '${title}', '${description}', ${completed});
            `;

            await sql.query(subtaskQuery);
        });

        await Promise.all(subtaskInsertPromises);
    });

    await Promise.all(taskInsertPromises);

    return scrumboardId;
}

module.exports = { addScrumboard };
