USE [Eugenics]
GO

/****** Object:  Table [dbo].[ClassSet]    Script Date: 5/5/2014 10:02:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ClassSet](
	[CharacterID] [bigint] NOT NULL,
	[ClassID] [int] NOT NULL,
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ClassSet]  WITH CHECK ADD  CONSTRAINT [FK_ClassSet_Character] FOREIGN KEY([CharacterID])
REFERENCES [dbo].[Character] ([CharacterID])
GO

ALTER TABLE [dbo].[ClassSet] CHECK CONSTRAINT [FK_ClassSet_Character]
GO

ALTER TABLE [dbo].[ClassSet]  WITH CHECK ADD  CONSTRAINT [FK_ClassSet_Class] FOREIGN KEY([ClassID])
REFERENCES [dbo].[Class] ([ClassID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[ClassSet] CHECK CONSTRAINT [FK_ClassSet_Class]
GO


