using Eugenics.Dao.Interface;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Web;

namespace Eugenics.Dao.Dapper
{
    public class DapperCharacterSkillDao : DapperDao, ICharacterSkillDao
    {
        public DapperCharacterSkillDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<int> GetSkillsByCharacter(int id)
        {
            const string sql =
                @"SELECT cs.[SkillId]
                FROM [CharacterSkill] as cs
                WHERE cs.[CharacterId] = @Id";

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
