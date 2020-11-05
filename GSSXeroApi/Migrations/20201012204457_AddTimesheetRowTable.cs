using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GSSXeroApi.Migrations
{
    public partial class AddTimesheetRowTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Timesheets_Clients_ClientId",
                table: "Timesheets");

            migrationBuilder.DropIndex(
                name: "IX_Timesheets_ClientId",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Timesheets");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Timesheets");

            migrationBuilder.CreateTable(
                name: "TimesheetRow",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    ClientId = table.Column<int>(nullable: false),
                    Duration = table.Column<double>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    TimesheetId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimesheetRow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimesheetRow_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ClientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimesheetRow_Timesheets_TimesheetId",
                        column: x => x.TimesheetId,
                        principalTable: "Timesheets",
                        principalColumn: "TimesheetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRow_ClientId",
                table: "TimesheetRow",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_TimesheetRow_TimesheetId",
                table: "TimesheetRow",
                column: "TimesheetId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimesheetRow");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Timesheets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Duration",
                table: "Timesheets",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Timesheets",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Timesheets",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Timesheets",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Timesheets_ClientId",
                table: "Timesheets",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Timesheets_Clients_ClientId",
                table: "Timesheets",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
