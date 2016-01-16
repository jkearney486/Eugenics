USE [Eugenics]
GO

/****** Object:  Table [dbo].[CharacterSkill]    Script Date: 1/15/2016 7:03:54 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CharacterSkill](
	[CharacterId] [int] NOT NULL,
	[SkillId] [int] NOT NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[CharacterSkill]  WITH CHECK ADD  CONSTRAINT [FK_CharacterSkill_Character] FOREIGN KEY([CharacterId])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[CharacterSkill] CHECK CONSTRAINT [FK_CharacterSkill_Character]
GO

ALTER TABLE [dbo].[CharacterSkill]  WITH CHECK ADD  CONSTRAINT [FK_CharacterSkill_Skill] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skill] ([Id])
GO

ALTER TABLE [dbo].[CharacterSkill] CHECK CONSTRAINT [FK_CharacterSkill_Skill]
GO


