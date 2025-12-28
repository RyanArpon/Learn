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
    public class AnswersController : ControllerBase {
        private readonly LearnDbContext dbContext;
        private readonly IAnswerRepository answerRepository;
        private readonly IMapper mapper;
        private readonly ILogger<AnswersController> logger;

        public AnswersController(
            LearnDbContext dbContext,
            IAnswerRepository answerRepository,
            IMapper mapper,
            ILogger<AnswersController> logger
        ) {
            this.dbContext = dbContext;
            this.answerRepository = answerRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        [HttpGet]
        //[Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetAll() {
            // Get Data from Database - Domain Models
            var questionsDomain = await answerRepository.GetAllAsync();

            // Return DTOs
            logger.LogInformation($"Finished GetAllQuestions request with data: {JsonSerializer.Serialize(questionsDomain)}");

            return Ok(mapper.Map<List<AnswerDto>>(questionsDomain));
        }

        [HttpGet]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetById(Guid id) {
            var answerDomain = await answerRepository.GetByIdAsync(id);

            if (answerDomain == null) {
                return NotFound();
            }

            // Return DTO
            return Ok(mapper.Map<AnswerDto>(answerDomain));
        }

        [HttpPost]
        [ValidateModel]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddAnswerRequestDto addAnswerRequestDto) {
            // Map/Convert DTO to Domain Model
            var answerDomainModel = mapper.Map<Answer>(addAnswerRequestDto);

            // Use Domain Model to create Answer
            answerDomainModel = await answerRepository.CreateAsync(answerDomainModel);

            if (answerDomainModel == null) {
                return NotFound($"QuestionId: {addAnswerRequestDto.QuestionId} not found.");
            }

            // Map/Convert Domain Model to DTO
            var answerDto = mapper.Map<AnswerDto>(answerDomainModel);

            return CreatedAtAction(nameof(GetById), new { id = answerDto.Id }, answerDto);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateAnswerRequestDto updateAnswerRequestDto) {
            // Map DTO to Domain Model
            var answerDomainModel = mapper.Map<Answer>(updateAnswerRequestDto);

            // Check if Answer exists
            answerDomainModel = await answerRepository.UpdateAsync(id, answerDomainModel);

            if (answerDomainModel == null) {
                return NotFound();
            }

            return Ok(mapper.Map<AnswerDto>(answerDomainModel));
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        //[Authorize(Roles = "Writer,Reader")]
        public async Task<IActionResult> Delete([FromRoute] Guid id) {
            // Check if Answer exists
            var answerDomainModel = await answerRepository.DeleteAsync(id);

            if (answerDomainModel == null) {
                return NotFound();
            }

            // Map/Convert Domain Model to DTO
            var regionDto = mapper.Map<AnswerDto>(answerDomainModel);

            return Ok(regionDto);
        }
    }
}
