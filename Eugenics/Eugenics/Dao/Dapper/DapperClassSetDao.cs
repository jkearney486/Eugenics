using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperClassSetDao : DapperDao, IClassSetDao
    {
        public DapperClassSetDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<int> GetByCharacterId(int id)
        {
            const string sql =
                @"SELECT c.[ClassId]
                FROM [ClassSet] as c
                where c.[CharacterId] = @Id";

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
