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
    public class QuestionsController : ControllerBase {
        private readonly LearnDbContext dbContext;
        private readonly IQuestionRepository questionRepository;
        private readonly IMapper mapper;
        private readonly ILogger<QuestionsController> logger;

        public QuestionsController(
            LearnDbContext dbContext,
            IQuestionRepository questionRepository,
            IMapper mapper,
            ILogger<QuestionsController> logger
        ) {
            this.dbContext = dbContext;
            this.questionRepository = questionRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        //[Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetAll() {
            // Get Data from Database - Domain Models
            var questionsDomain = await questionRepository.GetAllAsync();

            // Return DTOs
            logger.LogInformation($"Finished GetAllQuestions request with data: {JsonSerializer.Serialize(questionsDomain)}");

            return Ok(mapper.Map<List<QuestionDto>>(questionsDomain));
        }

        [HttpGet]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetById(Guid id) {
            var questionDomain = await questionRepository.GetByIdAsync(id);

            if (questionDomain == null) {
                return NotFound();
            }

            // Return DTO
            return Ok(mapper.Map<QuestionDto>(questionDomain));
        }

        [HttpPost]
        [ValidateModel]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddQuestionRequestDto addQuestionRequestDto) {
            // Map/Convert DTO to Domain Model
            var questionDomainModel = mapper.Map<Question>(addQuestionRequestDto);

            // Use Domain Model to create Question
            questionDomainModel = await questionRepository.CreateAsync(questionDomainModel);

            if (questionDomainModel == null) {
                return NotFound($"TopicId: {addQuestionRequestDto.TopicId} not found.");
            }

            // Map/Convert Domain Model to DTO
            var questionDto = mapper.Map<QuestionDto>(questionDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = questionDto.Id }, questionDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateQuestionRequestDto updateQuestionRequestDto) {
            // Map DTO to Domain Model
            var questionDomainModel = mapper.Map<Question>(updateQuestionRequestDto);

            // Check if Question exists
            questionDomainModel = await questionRepository.UpdateAsync(id, questionDomainModel);

            if (questionDomainModel == null) {
                return NotFound();
            }

            return Ok(mapper.Map<QuestionDto>(questionDomainModel));
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Delete([FromRoute] Guid id) {
            // Check if Question exists
            //var questionDomainModel = await dbContext.Questions.FirstOrDefaultAsync(x => x.Id == id);
            var questionDomainModel = await questionRepository.DeleteAsync(id);

            if (questionDomainModel == null) {
                return NotFound();
            }

            // Map/Convert Domain Model to DTO
            var regionDto = mapper.Map<QuestionDto>(questionDomainModel);

            return Ok(regionDto);
        }
    }
}
