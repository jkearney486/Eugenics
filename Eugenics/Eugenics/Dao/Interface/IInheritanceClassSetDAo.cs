using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IInheritanceClassSetDao : IDao
    {
        IEnumerable<int> GetByParents(int maleParentId, int femaleParentId, bool maleChild, bool femaleChild);
    }
}
