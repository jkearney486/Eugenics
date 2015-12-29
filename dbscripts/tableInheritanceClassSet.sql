USE [Eugenics]
GO

/****** Object:  Table [dbo].[InheritanceClassSet]    Script Date: 12/28/2015 8:54:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[InheritanceClassSet](
	[CharacterId] [int] NOT NULL,
	[ClassId] [int] NOT NULL,
	[Male] [bit] NOT NULL,
	[Female] [bit] NOT NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[InheritanceClassSet] ADD  CONSTRAINT [DF_InheritanceClassSet_Male]  DEFAULT ((0)) FOR [Male]
GO

ALTER TABLE [dbo].[InheritanceClassSet] ADD  CONSTRAINT [DF_InheritanceClassSet_Female]  DEFAULT ((0)) FOR [Female]
GO

ALTER TABLE [dbo].[InheritanceClassSet]  WITH CHECK ADD  CONSTRAINT [FK_InheritanceClassSet_Character] FOREIGN KEY([CharacterId])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[InheritanceClassSet] CHECK CONSTRAINT [FK_InheritanceClassSet_Character]
GO

ALTER TABLE [dbo].[InheritanceClassSet]  WITH CHECK ADD  CONSTRAINT [FK_InheritanceClassSet_Class] FOREIGN KEY([ClassId])
REFERENCES [dbo].[Class] ([Id])
GO

ALTER TABLE [dbo].[InheritanceClassSet] CHECK CONSTRAINT [FK_InheritanceClassSet_Class]
GO


