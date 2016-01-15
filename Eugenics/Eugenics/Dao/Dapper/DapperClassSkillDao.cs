using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Dapper;
using System;

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

        public IEnumerable<int> GetInheritableSkills(IEnumerable<int> ids, bool maleChild, bool femaleChild)
        {
            const string maleChildSql =
                @"SELECT c.[SkillId]
                FROM [ClassSkill] as c
                JOIN [Skill] as s on c.[SkillId] = s.[Id]
                WHERE s.[DLC] = 0 
                AND s.[MaleInheritable] = 1
                AND c.[ClassId] IN @Ids";

            const string femaleChildSql =
                @"SELECT c.[SkillId]
                FROM [ClassSkill] as c
                JOIN [Skill] as s on c.[SkillId] = s.[Id]
                WHERE s.[DLC] = 0 
                AND s.[FemaleInheritable] = 1
                AND c.[ClassId] IN @Ids";

            using (var connection = GetConnection())
            {
                if (femaleChild)
                {
                    return connection.Query<int>(femaleChildSql, new
                    {
                        Ids = ids
                    });
                }
                else
                {
                    return connection.Query<int>(maleChildSql, new
                    {
                        Ids = ids
                    });
                }
            }
        }
    }
}
