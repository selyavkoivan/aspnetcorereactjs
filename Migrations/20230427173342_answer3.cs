using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistanceLearningSystem.Migrations
{
    /// <inheritdoc />
    public partial class answer3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Teachers_TeacherId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_TeacherId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "LessonId",
                table: "AttachedFiles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonId1",
                table: "AttachedFiles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CourseTeacher",
                columns: table => new
                {
                    CoursesCourseId = table.Column<int>(type: "int", nullable: false),
                    TeachersTeacherId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTeacher", x => new { x.CoursesCourseId, x.TeachersTeacherId });
                    table.ForeignKey(
                        name: "FK_CourseTeacher_Courses_CoursesCourseId",
                        column: x => x.CoursesCourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseTeacher_Teachers_TeachersTeacherId",
                        column: x => x.TeachersTeacherId,
                        principalTable: "Teachers",
                        principalColumn: "TeacherId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttachedFiles_LessonId",
                table: "AttachedFiles",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_AttachedFiles_LessonId1",
                table: "AttachedFiles",
                column: "LessonId1");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTeacher_TeachersTeacherId",
                table: "CourseTeacher",
                column: "TeachersTeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttachedFiles_Lessons_LessonId",
                table: "AttachedFiles",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttachedFiles_Lessons_LessonId1",
                table: "AttachedFiles",
                column: "LessonId1",
                principalTable: "Lessons",
                principalColumn: "LessonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttachedFiles_Lessons_LessonId",
                table: "AttachedFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_AttachedFiles_Lessons_LessonId1",
                table: "AttachedFiles");

            migrationBuilder.DropTable(
                name: "CourseTeacher");

            migrationBuilder.DropIndex(
                name: "IX_AttachedFiles_LessonId",
                table: "AttachedFiles");

            migrationBuilder.DropIndex(
                name: "IX_AttachedFiles_LessonId1",
                table: "AttachedFiles");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "AttachedFiles");

            migrationBuilder.DropColumn(
                name: "LessonId1",
                table: "AttachedFiles");

            migrationBuilder.AddColumn<int>(
                name: "TeacherId",
                table: "Courses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_TeacherId",
                table: "Courses",
                column: "TeacherId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Teachers_TeacherId",
                table: "Courses",
                column: "TeacherId",
                principalTable: "Teachers",
                principalColumn: "TeacherId");
        }
    }
}
