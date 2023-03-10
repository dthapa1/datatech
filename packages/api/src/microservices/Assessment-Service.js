const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) =>
// use the sequelize model Assessments from packages/api/src/database/models to save
// the assessment data in the PostgreSQL database

  await Assessment.create({
    catDateOfBirth: assessment.birthDate,
    catName: assessment.catName,
    instrumentType: assessment.instrumentType,
    riskLevel: assessment.riskLevel,
    score: assessment.score,
  });

  exports.delete = async (id) => {
    const rowId = parseInt(id);
    // eslint-disable-next-line no-console
    await Assessment.destroy({
      where: {
        id: rowId,
      },
    });
  };

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await Assessment.findAll({
    order: [['id', 'asc']]
  });

  return assessments;
};
