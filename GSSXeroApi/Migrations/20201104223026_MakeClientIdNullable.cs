using Microsoft.EntityFrameworkCore.Migrations;

namespace GSSXeroApi.Migrations
{
    public partial class MakeClientIdNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRows_Clients_ClientId",
                table: "TimesheetRows");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "TimesheetRows",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRows_Clients_ClientId",
                table: "TimesheetRows",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimesheetRows_Clients_ClientId",
                table: "TimesheetRows");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "TimesheetRows",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TimesheetRows_Clients_ClientId",
                table: "TimesheetRows",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
