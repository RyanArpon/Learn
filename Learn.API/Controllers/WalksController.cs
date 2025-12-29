using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Learn.API.CustomActionFilters;
using Learn.API.Models.Domain;
using Learn.API.Models.DTO;
using Learn.API.Repositories;

namespace Learn.API.Controllers {
    // /api/walks
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WalksController : ControllerBase {
        private readonly IMapper mapper;
        private readonly IWalkRepository walkRepository;

        public WalksController(
            IMapper mapper,
            IWalkRepository walkRepository
        ) {
            this.mapper = mapper;
            this.walkRepository = walkRepository;
        }

        // CREATE Walk
        // POST: /api/walks
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create(AddWalkRequestDto addWalkRequestDto) {
            // Map DTO to Domain Model
            var walkDomainModel = mapper.Map<Walk>(addWalkRequestDto);

            await walkRepository.CreateAsync(walkDomainModel);

            // Map Domain Model to DTO 
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }

        // GET ALL Walks
        // GET: /api/walks?filterOn=Name&filterQuery=Track&sortBy=Name&isAscending=true&pageNumber=1&pageSize=10
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? filterOn,
            [FromQuery] string? filterQuery,
            [FromQuery] string? sortBy,
            [FromQuery] bool? isAscending,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 1000
        ) {
            // Get Data from Database - Domain Models
            var walksDomainModel = await walkRepository.GetAllAsync(
                filterOn,
                filterQuery,
                sortBy,
                isAscending ?? true,
                pageNumber,
                pageSize
            );

            // Return DTOs
            return Ok(mapper.Map<List<WalkDto>>(walksDomainModel));
        }

        // GET Walk by Id
        // GET: /api/walks/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById(Guid id) {
            var walkDomainModel = await walkRepository.GetByIdAsync(id);

            if (walkDomainModel == null) {
                return NotFound();
            }

            // Return DTO
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }

        // PUT To Update Walk
        // PUT: /api/walks/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateWalkRequestDto updateWalkRequestDto) {
            // Map DTO to Domain Model
            var walkDomainModel = mapper.Map<Walk>(updateWalkRequestDto);

            // Check if Region exists
            walkDomainModel = await walkRepository.UpdateAsync(id, walkDomainModel);

            if (walkDomainModel == null) {
                return NotFound();
            }

            // Map/Convert Domain Model to DTO
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }

        // DELETE Walk
        // DELETE: /api/walks/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id) {
            var walkDomainModel = await walkRepository.DeleteAsync(id);

            if (walkDomainModel == null) {
                return NotFound();
            }

            // Map/Convert Domain Model to DTO
            return Ok(mapper.Map<WalkDto>(walkDomainModel));
        }
    }
}
