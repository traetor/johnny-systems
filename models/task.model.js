module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM("do zrobienia", "w trakcie", "zrobione"),
            defaultValue: "do zrobienia",
        },
    });

    return Task;
};
