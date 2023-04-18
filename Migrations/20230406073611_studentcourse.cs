using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DistanceLearningSystem.Migrations
{
    /// <inheritdoc />
    public partial class studentcourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Courses_CoursesCourseId",
                table: "StudentCourses");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentCourses_Students_StudentsStudentId",
                table: "StudentCourses");

            migrationBuilder.DropIndex(
                name: "IX_Students_StudentInfoId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentCourses",
                table: "StudentCourses");

            migrationBuilder.RenameTable(
                name: "StudentCourses",
                newName: "CourseStudent");

            migrationBuilder.RenameIndex(
                name: "IX_StudentCourses_StudentsStudentId",
                table: "CourseStudent",
                newName: "IX_CourseStudent_StudentsStudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseStudent",
                table: "CourseStudent",
                columns: new[] { "CoursesCourseId", "StudentsStudentId" });

            migrationBuilder.CreateIndex(
                name: "IX_Students_StudentInfoId",
                table: "Students",
                column: "StudentInfoId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseStudent_Courses_CoursesCourseId",
                table: "CourseStudent",
                column: "CoursesCourseId",
                principalTable: "Courses",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseStudent_Students_StudentsStudentId",
                table: "CourseStudent",
                column: "StudentsStudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseStudent_Courses_CoursesCourseId",
                table: "CourseStudent");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseStudent_Students_StudentsStudentId",
                table: "CourseStudent");

            migrationBuilder.DropIndex(
                name: "IX_Students_StudentInfoId",
                table: "Students");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseStudent",
                table: "CourseStudent");

            migrationBuilder.RenameTable(
                name: "CourseStudent",
                newName: "StudentCourses");

            migrationBuilder.RenameIndex(
                name: "IX_CourseStudent_StudentsStudentId",
                table: "StudentCourses",
                newName: "IX_StudentCourses_StudentsStudentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentCourses",
                table: "StudentCourses",
                columns: new[] { "CoursesCourseId", "StudentsStudentId" });

            migrationBuilder.CreateIndex(
                name: "IX_Students_StudentInfoId",
                table: "Students",
                column: "StudentInfoId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Courses_CoursesCourseId",
                table: "StudentCourses",
                column: "CoursesCourseId",
                principalTable: "Courses",
                principalColumn: "CourseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentCourses_Students_StudentsStudentId",
                table: "StudentCourses",
                column: "StudentsStudentId",
                principalTable: "Students",
                principalColumn: "StudentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
