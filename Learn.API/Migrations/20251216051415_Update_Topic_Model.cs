using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Learn.API.Migrations
{
    /// <inheritdoc />
    public partial class Update_Topic_Model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Topics",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Topics");
        }
    }
}
