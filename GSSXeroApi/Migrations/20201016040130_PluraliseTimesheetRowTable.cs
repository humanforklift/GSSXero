using Microsoft.EntityFrameworkCore.Migrations;

namespace GSSXeroApi.Migrations
{
    public partial class PluraliseTimesheetRowTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRow_Clients_ClientId",
                table: "TimesheetRow");

            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRow_Timesheets_TimesheetId",
                table: "TimesheetRow");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimesheetRow",
                table: "TimesheetRow");

            migrationBuilder.RenameTable(
                name: "TimesheetRow",
                newName: "TimesheetRows");

            migrationBuilder.RenameIndex(
                name: "IX_TimesheetRow_TimesheetId",
                table: "TimesheetRows",
                newName: "IX_TimesheetRows_TimesheetId");

            migrationBuilder.RenameIndex(
                name: "IX_TimesheetRow_ClientId",
                table: "TimesheetRows",
                newName: "IX_TimesheetRows_ClientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimesheetRows",
                table: "TimesheetRows",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRows_Clients_ClientId",
                table: "TimesheetRows",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRows_Timesheets_TimesheetId",
                table: "TimesheetRows",
                column: "TimesheetId",
                principalTable: "Timesheets",
                principalColumn: "TimesheetId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRows_Clients_ClientId",
                table: "TimesheetRows");

            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRows_Timesheets_TimesheetId",
                table: "TimesheetRows");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimesheetRows",
                table: "TimesheetRows");

            migrationBuilder.RenameTable(
                name: "TimesheetRows",
                newName: "TimesheetRow");

            migrationBuilder.RenameIndex(
                name: "IX_TimesheetRows_TimesheetId",
                table: "TimesheetRow",
                newName: "IX_TimesheetRow_TimesheetId");

            migrationBuilder.RenameIndex(
                name: "IX_TimesheetRows_ClientId",
                table: "TimesheetRow",
                newName: "IX_TimesheetRow_ClientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimesheetRow",
                table: "TimesheetRow",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRow_Clients_ClientId",
                table: "TimesheetRow",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRow_Timesheets_TimesheetId",
                table: "TimesheetRow",
                column: "TimesheetId",
                principalTable: "Timesheets",
                principalColumn: "TimesheetId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
