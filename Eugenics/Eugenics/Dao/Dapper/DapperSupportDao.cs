using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperSupportDao : DapperDao, ISupportDao
    {
        public DapperSupportDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<int> GetSupports(int id)
        {
            const string sql = 
                @"(SELECT s.[CharacterId]
                   FROM [Support] as s
                   WHERE s.[SupportId] = @Id)
                   UNION (SELECT s.[SupportId]
                   FROM [Support] as s
                   WHERE s.[CharacterId] = @Id)";

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
