using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistanceLearningSystem.Migrations
{
    /// <inheritdoc />
    public partial class newEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NewEmail",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewEmail",
                table: "AspNetUsers");
        }
    }
}
