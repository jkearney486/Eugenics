using System;

namespace Eugenics.Dao.Interface
{
    public interface IDao
    {
        void PerformInTransaction(Action actionToPerform);
    }
}
