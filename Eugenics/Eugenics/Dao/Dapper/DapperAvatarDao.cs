using Eugenics.Dao.Interface;
using System.Collections.Generic;
using Eugenics.Models;
using Dapper;

namespace Eugenics.Dao.Dapper
{
    public class DapperAvatarDao : DapperDao, IAvatarDao
    {
        private const string AssetSelectSql =
            @"SELECT a.[Id]
                    ,a.[Name]
                    ,a.[Str]
                    ,a.[Mag]
                    ,a.[Skl]
                    ,a.[Spd]
                    ,a.[Lck]
                    ,a.[Def]
                    ,a.[Res]
                  FROM [AvatarAsset] as a ";

        private const string FlawSelectSql =
            @"SELECT f.[Id]
                    ,f.[Name]
                    ,f.[Str]
                    ,f.[Mag]
                    ,f.[Skl]
                    ,f.[Spd]
                    ,f.[Lck]
                    ,f.[Def]
                    ,f.[Res]
                  FROM [AvatarFlaw] as f ";

        public DapperAvatarDao(IConnectionStringProvider connectionStringProvider)
            : base(connectionStringProvider)
        {
        }

        public IEnumerable<AssetFlaw> GetAssets()
        {
            const string sql = AssetSelectSql;

            using (var connection = GetConnection())
            {
                return connection.Query<AssetFlaw>(sql);
            }
        }

        public IEnumerable<AssetFlaw> GetFlaws()
        {
            const string sql = FlawSelectSql;

            using (var connection = GetConnection())
            {
                return connection.Query<AssetFlaw>(sql);
            }
        }
    }
}
