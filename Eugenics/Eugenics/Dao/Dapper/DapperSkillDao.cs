using Eugenics.Dao.Interface;
using System.Collections.Generic;
using System.Linq;
using Eugenics.Models;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperSkillDao : DapperDao, ISkillDao
    {
        private const string SelectSql =
            @"SELECT s.[Id]
                    ,s.[Name]
                    ,s.[Description]
                    ,s.[ActivationStat]
                    ,s.[ActivationMultiplier]
                    ,s.[DLC]
                FROM [Skill] as s ";

        public DapperSkillDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<Skill> GetAll()
        {
            const string sql = SelectSql;

            using (var connection = GetConnection())
            {
                return connection.Query<Skill>(sql);
            }
        }

        public Skill GetById(int id)
        {
            const string sql = SelectSql + " WHERE Id = @Id";

            using (var connection = GetConnection())
            {
                return connection.Query<Skill>(sql, new
                {
                    Id = id
                }).FirstOrDefault();
            }
        }
    }
}
