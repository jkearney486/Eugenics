using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Eugenics.Controllers
{
    [RoutePrefix("api/skills")]
    public class SkillsController : ApiController
    {
        private readonly ISkillDao _skillDao;

        public SkillsController(ISkillDao skillDao)
        {
            _skillDao = skillDao;
        }

        [HttpGet, Route("")]
        public IEnumerable<Skill> Get()
        {
            return _skillDao.GetAll();
        }

        [HttpGet, Route("{id}")]
        public Skill Get(int id)
        {
            return _skillDao.GetById(id);
        }
    }
}
