using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperClassSkillDao: DapperDao, IClassSkillDao
    {
        public DapperClassSkillDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<int> GetSkills(IEnumerable<int> ids)
        {
            const string sql =
                @"SELECT c.[SkillId]
                FROM [ClassSkill] as c
                WHERE c.[ClassId] IN @Ids";

            using (var connection = GetConnection())
            {
                return connection.Query<int>(sql, new
                {
                    Ids = ids
                });
            }
        }

        public IEnumerable<int> GetSkills(int id)
        {
            const string sql =
                @"SELECT c.[SkillId]
                FROM [ClassSkill] as c
                WHERE c.[ClassId] = @Id";

            using (var connection = GetConnection())
            {
                return connection.Query<int>(sql, new
                {
                    Id = id
                });
            }
        }
    }
}
