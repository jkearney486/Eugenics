using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IInheritanceSkillDao : IDao
    {
        IEnumerable<int> GetByParents(int maleParentId, int femaleParentId, bool maleChild, bool femaleChild);
    }
}
