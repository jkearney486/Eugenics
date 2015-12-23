using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Eugenics.Controllers
{
    [RoutePrefix("api/avatar")]
    public class AvatarController : ApiController
    {
        private readonly IAvatarDao _avatarDao;

        public AvatarController(IAvatarDao avatarDao)
        {
            _avatarDao = avatarDao;
        }

        [HttpGet, Route("assets")]
        public IEnumerable<AssetFlaw> GetAssets()
        {
            return _avatarDao.GetAssets();
        }

        [HttpGet, Route("flaws")]
        public IEnumerable<AssetFlaw> GetFlaws()
        {
            return _avatarDao.GetFlaws();
        }
    }
}
