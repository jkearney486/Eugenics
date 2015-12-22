USE [Eugenics]
GO

/****** Object:  Table [dbo].[ClassPromotion]    Script Date: 5/5/2014 10:02:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ClassPromotion](
	[BaseClassId] [int] NOT NULL,
	[PromotedClassId] [int] NOT NULL,
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[ClassPromotion]  WITH CHECK ADD  CONSTRAINT [FK_ClassPromotion_Base] FOREIGN KEY([BaseClassId])
REFERENCES [dbo].[Class] ([Id])
GO

ALTER TABLE [dbo].[ClassPromotion] CHECK CONSTRAINT [FK_ClassPromotion_Base]
GO

ALTER TABLE [dbo].[ClassPromotion]  WITH CHECK ADD  CONSTRAINT [FK_ClassPromotion_Promoted] FOREIGN KEY([PromotedClassId])
REFERENCES [dbo].[Class] ([Id])
GO

ALTER TABLE [dbo].[ClassPromotion] CHECK CONSTRAINT [FK_ClassPromotion_Promoted]
GO


