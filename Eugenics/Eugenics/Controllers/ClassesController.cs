using Eugenics.Dao.Interface;
using Eugenics.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Eugenics.Controllers
{
    [RoutePrefix("api/classes")]
    public class ClassesController : ApiController
    {
        private readonly IClassDao _classDao;
        private readonly IClassPromotionDao _classPromotionDao;
        private readonly IClassSkillDao _classSkillDao;

        public ClassesController(IClassDao classDao,
            IClassPromotionDao classPromotionDao,
            IClassSkillDao classSkillDao)
        {
            _classDao = classDao;
            _classPromotionDao = classPromotionDao;
            _classSkillDao = classSkillDao;
        }

        [HttpGet, Route("")]
        public IEnumerable<Class> Get()
        {
            return _classDao.GetAll();
        }

        [HttpGet, Route("{id}")]
        public Class Get(int id)
        {
            return _classDao.GetById(id);
        }

        [HttpGet, Route("{id}/promotions")]
        public IEnumerable<int> GetPromotedClasses(int id)
        {
            return _classPromotionDao.GetPromotions(id);
        }

        [HttpGet, Route("promotions")]
        public IEnumerable<int> GetPromotedClasses([FromUri]IEnumerable<int> ids)
        {
            return _classPromotionDao.GetPromotions(ids);
        }

        [HttpGet, Route("{id}/skills")]
        public IEnumerable<int> GetSkills(int id)
        {
            return _classSkillDao.GetSkills(id);
        }

        [HttpGet, Route("skills")]
        public IEnumerable<int> GetSkills([FromUri]IEnumerable<int> ids)
        {
            return _classSkillDao.GetSkills(ids);
        }
    }
}
