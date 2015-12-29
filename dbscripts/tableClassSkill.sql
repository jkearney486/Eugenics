USE [Eugenics]
GO

/****** Object:  Table [dbo].[ClassSkill]    Script Date: 12/29/2015 4:47:07 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ClassSkill](
	[ClassId] [int] NOT NULL,
	[SkillId] [int] NOT NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ClassSkill]  WITH CHECK ADD  CONSTRAINT [FK_ClassSkill_Class] FOREIGN KEY([ClassId])
REFERENCES [dbo].[Class] ([Id])
GO

ALTER TABLE [dbo].[ClassSkill] CHECK CONSTRAINT [FK_ClassSkill_Class]
GO

ALTER TABLE [dbo].[ClassSkill]  WITH CHECK ADD  CONSTRAINT [FK_ClassSkill_Skill] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skill] ([Id])
GO

ALTER TABLE [dbo].[ClassSkill] CHECK CONSTRAINT [FK_ClassSkill_Skill]
GO


