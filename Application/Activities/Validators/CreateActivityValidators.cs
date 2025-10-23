using System;
using Application.Activities.Commands;
using Application.Activities.DTO;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidators : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidators() : base(x => x.ActivityDto)
    {
    }

}
