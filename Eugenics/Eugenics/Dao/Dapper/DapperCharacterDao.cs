using Eugenics.Dao.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Eugenics.Models;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperCharacterDao : DapperDao, ICharacterDao
    {
        private const string SelectSql =
            @"SELECT c.[Id]
                    ,c.[Name]
                    ,c.[Gender]
                    ,c.[ModStr]
                    ,c.[ModMag]
                    ,c.[ModSkl]
                    ,c.[ModSpd]
                    ,c.[ModLck]
                    ,c.[ModDef]
                    ,c.[ModRes]
                    ,c.[ParentID]
              FROM [Character] as c ";

        public DapperCharacterDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<Character> GetAll()
        {
            const string sql = SelectSql;

            using (var connection = GetConnection())
            {
                return connection.Query<Character>(sql);
            }
        }

        public Character GetById(int id)
        {
            const string sql = SelectSql + " WHERE Id = @Id";

            using (var connection = GetConnection())
            {
                return connection.Query<Character>(sql, new
                {
                    Id = id
                }).FirstOrDefault();
            }
        }
    }
}
