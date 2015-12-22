USE [Eugenics]
GO

/****** Object:  Table [dbo].[Support]    Script Date: 5/5/2014 10:02:44 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Support](
	[CharacterId] [int] NOT NULL,
	[SupportId] [int] NOT NULL
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Support]  WITH CHECK ADD  CONSTRAINT [FK_Support_Character] FOREIGN KEY([CharacterId])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[Support] CHECK CONSTRAINT [FK_Support_Character]
GO

ALTER TABLE [dbo].[Support]  WITH CHECK ADD  CONSTRAINT [FK_Support_PairCharacter] FOREIGN KEY([SupportId])
REFERENCES [dbo].[Character] ([Id])
GO

ALTER TABLE [dbo].[Support] CHECK CONSTRAINT [FK_Support_PairCharacter]
GO


