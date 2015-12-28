using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Eugenics.Models;
using Dapper;
using System.Linq;

namespace Eugenics.Dao.Dapper
{
    public class DapperClassDao : DapperDao, IClassDao
    {
        private const string SelectSql =
            @"SELECT c.[Id]
                    ,c.[Name]
                    ,c.[MaxHP]
                    ,c.[MaxStr]
                    ,c.[MaxMag]
                    ,c.[MaxSkl]
                    ,c.[MaxSpd]
                    ,c.[MaxLck]
                    ,c.[MaxDef]
                    ,c.[MaxRes]
                    ,c.[PairStr]
                    ,c.[PairMag]
                    ,c.[PairSkl]
                    ,c.[PairSpd]
                    ,c.[PairLck]
                    ,c.[PairDef]
                    ,c.[PairRes]
                    ,c.[PairMov]
                    ,c.[IsBaseClass]
                FROM [Class] as c ";

        public DapperClassDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<Class> GetAll()
        {
            const string sql = SelectSql;

            using (var connection = GetConnection())
            {
                return connection.Query<Class>(sql);
            }
        }

        public Class GetById(int id)
        {
            const string sql = SelectSql + " WHERE Id = @Id";

            using (var connection = GetConnection())
            {
                return connection.Query<Class>(sql, new
                {
                    Id = id
                }).FirstOrDefault();
            }
        }
    }
}
