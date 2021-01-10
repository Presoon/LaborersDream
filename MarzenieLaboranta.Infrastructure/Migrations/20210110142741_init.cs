using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MarzenieLaboranta.Infrastructure.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Localizations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Localizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Login = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SeriesNumber = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InstalationKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfPurchase = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LocalizationId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    DateOfScrapping = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Resources_Localizations_LocalizationId",
                        column: x => x.LocalizationId,
                        principalTable: "Localizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FailureReports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FailureDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReporterId = table.Column<long>(type: "bigint", nullable: false),
                    ResourceId = table.Column<long>(type: "bigint", nullable: false),
                    RepairmanId = table.Column<long>(type: "bigint", nullable: false),
                    DateOfReporting = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RepairStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FailureReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FailureReports_Resources_ResourceId",
                        column: x => x.ResourceId,
                        principalTable: "Resources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FailureReports_ResourceId",
                table: "FailureReports",
                column: "ResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_Resources_LocalizationId",
                table: "Resources",
                column: "LocalizationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FailureReports");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.DropTable(
                name: "Localizations");
        }
    }
}
