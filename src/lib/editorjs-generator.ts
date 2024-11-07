import { OutputBlockData, OutputData } from '@editorjs/editorjs'

interface Product {
  title: string
  description: string
  key_features: string[]
}

export class EditorJsGenerator {
  private readonly time: number
  private readonly version: string

  constructor() {
    this.time = new Date().getTime()
    this.version = '2.28.2'
  }

  generate(blocks: OutputBlockData[]) {
    return {
      time: this.time,
      blocks: blocks,
      version: this.version
    }
  }

  createHeader(text: string, level: number = 1): OutputBlockData {
    return {
      type: 'header',
      data: {
        text,
        level
      }
    }
  }

  createParagraph(text: string): OutputBlockData {
    return {
      type: 'paragraph',
      data: {
        text
      }
    }
  }

  createList(items: string[], style: string = 'unordered'): OutputBlockData {
    return {
      type: 'list',
      data: {
        style,
        items
      }
    }
  }

  createImage(url: string, caption: string = ''): OutputBlockData {
    return {
      type: 'image',
      data: {
        file: { url },
        caption,
        withBorder: false,
        withBackground: true,
        stretched: false
      }
    }
  }

  convertProductData(
    productData: Product | null,
    imageUrl: string
  ): OutputData | null {
    if (!productData) return productData

    const blocks: OutputBlockData[] = []

    // Add title
    if (productData.title) {
      blocks.push(this.createHeader(productData.title, 1))
    }

    // Add image if provided
    if (imageUrl) {
      blocks.push(this.createImage(imageUrl, productData.title))
    }

    // Add description paragraphs
    if (productData.description) {
      const paragraphs = productData.description.split('\n\n')
      paragraphs.forEach(paragraph => {
        if (paragraph.trim()) {
          blocks.push(this.createParagraph(paragraph.trim()))
        }
      })
    }

    // Add key features
    if (productData.key_features && productData.key_features.length > 0) {
      blocks.push(this.createHeader('Key Features', 3))
      blocks.push(this.createList(productData.key_features))
    }

    return this.generate(blocks)
  }
}
