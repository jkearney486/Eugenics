using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface ICharacterSkillDao : IDao
    {
        IEnumerable<int> GetSkillsByCharacter(int id);
    }
}
