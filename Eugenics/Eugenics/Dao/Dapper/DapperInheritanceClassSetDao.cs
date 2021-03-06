﻿using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperInheritanceClassSetDao : DapperDao, IInheritanceClassSetDao
    {
        public DapperInheritanceClassSetDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }
        
        public IEnumerable<int> GetByParents(int maleParentId, int femaleParentId, bool maleChild, bool femaleChild)
        {
            const string femaleChildSql =
                @"(SELECT i.[ClassId]
                   FROM [InheritanceClassSet] as i
                   WHERE i.[CharacterId] = @femaleParentId AND
	                     i.[Female] = 1)
                   UNION
                   (SELECT i.[ClassId]
                   FROM [InheritanceClassSet] as i
                   WHERE i.[CharacterId] = @maleParentId AND
	                     i.[Female] = 1)";

            const string maleChildSql =
                @"(SELECT i.[ClassId]
                   FROM [InheritanceClassSet] as i
                   WHERE i.[CharacterId] = @femaleParentId AND
                         i.[Male] = 1)
                   UNION
                   (SELECT i.[ClassId]
                   FROM [InheritanceClassSet] as i
                   WHERE i.[CharacterId] = @maleParentId AND
                         i.[Male] = 1)";

            using (var connection = GetConnection())
            {
                if (femaleChild)
                {
                    return connection.Query<int>(femaleChildSql, new
                    {
                        femaleParentId = femaleParentId,
                        maleParentId = maleParentId
                    });
                }
                else
                {
                    return connection.Query<int>(maleChildSql, new
                    {
                        femaleParentId = femaleParentId,
                        maleParentId = maleParentId
                    });
                }
            }
        }
    }
}
