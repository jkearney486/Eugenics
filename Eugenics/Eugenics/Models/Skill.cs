namespace Eugenics.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ActivationStat { get; set; }
        public float? ActivationMultiplier { get; set; }
        public bool DLC { get; set; }
    }
}
