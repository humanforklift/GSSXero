﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace GSSXeroApi.Migrations
{
    public partial class AddedTimesheetStatusColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Timesheets",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Timesheets");
        }
    }
}