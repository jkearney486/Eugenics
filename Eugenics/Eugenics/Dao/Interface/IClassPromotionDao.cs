using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IClassPromotionDao : IDao
    {
        IEnumerable<int> GetPromotions(int baseClassId);
        IEnumerable<int> GetPromotions(IEnumerable<int> baseClasses);
    }
}
