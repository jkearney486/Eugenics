USE [Eugenics]
GO

/****** Object:  Table [dbo].[ClassSet]    Script Date: 5/5/2014 10:02:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ClassSet](
	[CharacterId] [int] NOT NULL,
	[ClassId] [int] NOT NULL,
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ClassSet]  WITH CHECK ADD  CONSTRAINT [FK_ClassSet_Character] FOREIGN KEY([CharacterId])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[ClassSet] CHECK CONSTRAINT [FK_ClassSet_Character]
GO

ALTER TABLE [dbo].[ClassSet]  WITH CHECK ADD  CONSTRAINT [FK_ClassSet_Class] FOREIGN KEY([ClassId])
REFERENCES [dbo].[Class] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[ClassSet] CHECK CONSTRAINT [FK_ClassSet_Class]
GO


