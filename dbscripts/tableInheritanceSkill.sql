USE [Eugenics]
GO

/****** Object:  Table [dbo].[InheritanceSkill]    Script Date: 12/29/2015 8:21:39 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[InheritanceSkill](
	[CharacterId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
	[Male] [bit] NOT NULL,
	[Female] [bit] NOT NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[InheritanceSkill]  WITH CHECK ADD  CONSTRAINT [FK_InheritanceSkill_Character] FOREIGN KEY([CharacterId])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[InheritanceSkill] CHECK CONSTRAINT [FK_InheritanceSkill_Character]
GO

ALTER TABLE [dbo].[InheritanceSkill]  WITH CHECK ADD  CONSTRAINT [FK_InheritanceSkill_Skill] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skill] ([Id])
GO

ALTER TABLE [dbo].[InheritanceSkill] CHECK CONSTRAINT [FK_InheritanceSkill_Skill]
GO


