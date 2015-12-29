using Eugenics.Dao.Interface;
using System.Collections.Generic;
using System.Linq;
using Eugenics.Models;
using Dapper;
using System;

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

        public string GetGender(int id)
        {
            const string sql =
            @"SELECT c.[Gender]
              FROM [Character] as c 
              WHERE c.[Id] = @Id";

            using (var connection = GetConnection())
            {
                return connection.Query<string>(sql, new
                {
                    Id = id
                }).FirstOrDefault();
            }
        }
    }
}
