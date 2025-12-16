using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Learn.API.CustomActionFilters;
using Learn.API.Data;
using Learn.API.Models.Domain;
using Learn.API.Models.DTO;
using Learn.API.Repositories;
using System.Text.Json;

namespace Learn.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase {
        private readonly LearnDbContext dbContext;
        private readonly ITopicRepository topicRepository;
        private readonly IMapper mapper;
        private readonly ILogger<TopicsController> logger;

        public TopicsController(
            LearnDbContext dbContext,
            ITopicRepository topicRepository,
            IMapper mapper,
            ILogger<TopicsController> logger
        ) {
            this.dbContext = dbContext;
            this.topicRepository = topicRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        //[Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetAll() {
            // Get Data from Database - Domain Models
            var topicsDomain = await topicRepository.GetAllAsync();

            // Return DTOs
            logger.LogInformation($"Finished GetAllTopics request with data: {JsonSerializer.Serialize(topicsDomain)}");

            return Ok(mapper.Map<List<TopicDto>>(topicsDomain));
        }

        // GET SINGLE REGION (Get Topic By ID)
        // GET: https://lolcalhost:portnumber/api/regions/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetById(Guid id) {
            // OPTION 1
            // var region = dbContext.Topics.Find(id);

            // OPTION 2
            var regionDomain = await topicRepository.GetByIdAsync(id);

            if (regionDomain == null) {
                return NotFound();
            }

            // Return DTO
            return Ok(mapper.Map<TopicDto>(regionDomain));
        }

        [HttpPost]
        [ValidateModel]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddTopicRequestDto addTopicRequestDto) {
            // Map/Convert DTO to Domain Model
            var topicDomainModel = mapper.Map<Topic>(addTopicRequestDto);

            // Use Domain Model to create Topic
            topicDomainModel = await topicRepository.CreateAsync(topicDomainModel);

            // Map/Convert Domain Model to DTO
            var topicDto = mapper.Map<TopicDto>(topicDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = topicDto.Id }, topicDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateTopicRequestDto updateTopicRequestDto) {
            // Map DTO to Domain Model
            var topicDomainModel = mapper.Map<Topic>(updateTopicRequestDto);

            // Check if Topic exists
            topicDomainModel = await topicRepository.UpdateAsync(id, topicDomainModel);

            if (topicDomainModel == null) {
                return NotFound();
            }

            return Ok(mapper.Map<TopicDto>(topicDomainModel));
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Delete([FromRoute] Guid id) {
            // Check if Topic exists
            //var topicDomainModel = await dbContext.Topics.FirstOrDefaultAsync(x => x.Id == id);
            var topicDomainModel = await topicRepository.DeleteAsync(id);

            if (topicDomainModel == null) {
                return NotFound();
            }

            // Map/Convert Domain Model to DTO
            var regionDto = mapper.Map<TopicDto>(topicDomainModel);

            return Ok(regionDto);
        }
    }
}
