using Eugenics.Models;
using System.Collections.Generic;

namespace Eugenics.Dao.Interface
{
    public interface IAvatarDao : IDao
    {
        IEnumerable<AssetFlaw> GetAssets();
        IEnumerable<AssetFlaw> GetFlaws();
    }
}
