using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperClassPromotionDao : DapperDao, IClassPromotionDao
    {
        public DapperClassPromotionDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<int> GetPromotions(IEnumerable<int> baseClasses)
        {
            const string sql =
                @"SELECT c.[PromotedClassId]
                  FROM [ClassPromotion] as c
                  WHERE c.[BaseClassId] IN @Ids";

            using (var connection = GetConnection())
            {
                return connection.Query<int>(sql, new
                {
                    Ids = baseClasses
                });
            }
        }

        public IEnumerable<int> GetPromotions(int baseClassId)
        {
            const string sql =
                @"SELECT c.[PromotedClassId]
                  FROM [ClassPromotion] as c
                  WHERE c.[BaseClassId] = @Id";

            using (var connection = GetConnection())
            {
                return connection.Query<int>(sql, new
                {
                    Id = baseClassId
                });
            }
        }
    }
}
