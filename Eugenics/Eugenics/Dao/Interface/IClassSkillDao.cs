using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IClassSkillDao : IDao
    {
        IEnumerable<int> GetSkills(int id);
        IEnumerable<int> GetSkills(IEnumerable<int> ids);
        IEnumerable<int> GetInheritableSkills(IEnumerable<int> ids, bool maleChild, bool femaleChild);
    }
}
