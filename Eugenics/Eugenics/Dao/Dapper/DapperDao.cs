using System;
using System.Data;
using System.Data.SqlClient;
using System.Transactions;

namespace Eugenics.Dao.Dapper
{
    public abstract class DapperDao
    {
        private readonly string _connectionString;

        protected DapperDao(IConnectionStringProvider connectionStringProvider)
        {
            _connectionString = connectionStringProvider.ConnectionString;
        }

        protected IDbConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public void PerformInTransaction(Action actionToPerform)
        {
            using (var scope = new TransactionScope())
            {
                actionToPerform();

                scope.Complete();
            }
        }
    }
}
