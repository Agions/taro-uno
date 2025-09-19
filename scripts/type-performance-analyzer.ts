/**
 * TypeScript Performance Analyzer
 * Analyzes and optimizes TypeScript compilation performance
 */

import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

// ==================== Performance Metrics ====================

interface PerformanceMetrics {
  totalFiles: number;
  totalLines: number;
  complexTypes: number;
  genericTypes: number;
  unionTypes: number;
  intersectionTypes: number;
  mappedTypes: number;
  conditionalTypes: number;
  recursiveTypes: number;
  typeInferenceScore: number;
  compilationTime: number;
  memoryUsage: number;
  optimizationScore: number;
}

interface OptimizationRecommendation {
  type: 'performance' | 'maintainability' | 'safety' | 'structure';
  priority: 'high' | 'medium' | 'low';
  description: string;
  file: string;
  line?: number;
  fix?: string;
}

// ==================== Type Complexity Analyzer ====================

class TypeComplexityAnalyzer {
  private metrics: PerformanceMetrics = {
    totalFiles: 0,
    totalLines: 0,
    complexTypes: 0,
    genericTypes: 0,
    unionTypes: 0,
    intersectionTypes: 0,
    mappedTypes: 0,
    conditionalTypes: 0,
    recursiveTypes: 0,
    typeInferenceScore: 0,
    compilationTime: 0,
    memoryUsage: 0,
    optimizationScore: 0,
  };

  private recommendations: OptimizationRecommendation[] = [];

  analyzeDirectory(dirPath: string): PerformanceMetrics {
    this.scanDirectory(dirPath);
    this.calculateOptimizationScore();
    return this.metrics;
  }

  getRecommendations(): OptimizationRecommendation[] {
    return this.recommendations;
  }

  private scanDirectory(dirPath: string): void {
    const files = this.getTsFiles(dirPath);
    this.metrics.totalFiles = files.length;

    files.forEach(file => {
      this.analyzeFile(file);
    });
  }

  private getTsFiles(dirPath: string): string[] {
    const files: string[] = [];

    const scan = (currentPath: string) => {
      const entries = fs.readdirSync(currentPath);

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !entry.startsWith('.')) {
          scan(fullPath);
        } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
          files.push(fullPath);
        }
      }
    };

    scan(dirPath);
    return files;
  }

  private analyzeFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf8');
    this.metrics.totalLines += content.split('\n').length;

    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true
    );

    this.analyzeTypeComplexity(sourceFile);
  }

  private analyzeTypeComplexity(sourceFile: ts.SourceFile): void {
    const analyze = (node: ts.Node) => {
      // Count complex type patterns
      if (ts.isTypeAliasDeclaration(node)) {
        this.analyzeTypeAlias(node);
      } else if (ts.isInterfaceDeclaration(node)) {
        this.analyzeInterface(node);
      } else if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        this.analyzeFunctionComplexity(node);
      } else if (ts.isClassDeclaration(node)) {
        this.analyzeClassComplexity(node);
      }

      ts.forEachChild(node, analyze);
    };

    ts.forEachChild(sourceFile, analyze);
  }

  private analyzeTypeAlias(node: ts.TypeAliasDeclaration): void {
    this.metrics.complexTypes++;

    if (node.typeParameters && node.typeParameters.length > 0) {
      this.metrics.genericTypes++;
    }

    this.analyzeTypeNode(node.type);
  }

  private analyzeInterface(node: ts.InterfaceDeclaration): void {
    this.metrics.complexTypes++;

    if (node.typeParameters && node.typeParameters.length > 0) {
      this.metrics.genericTypes++;
    }

    if (node.heritageClauses) {
      node.heritageClauses.forEach(clause => {
        if (clause.types.length > 2) {
          this.recommendations.push({
            type: 'maintainability',
            priority: 'medium',
            description: 'Interface extends too many types, consider composition',
            file: node.getSourceFile().fileName,
            line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
          });
        }
      });
    }
  }

  private analyzeFunctionComplexity(node: ts.FunctionDeclaration | ts.MethodDeclaration): void {
    if (node.typeParameters && node.typeParameters.length > 3) {
      this.recommendations.push({
        type: 'maintainability',
        priority: 'high',
        description: 'Function has too many generic parameters',
        file: node.getSourceFile().fileName,
        line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
        fix: 'Consider reducing generic parameters or using a generic interface',
      });
    }

    if (node.parameters && node.parameters.length > 5) {
      this.recommendations.push({
        type: 'maintainability',
        priority: 'medium',
        description: 'Function has too many parameters',
        file: node.getSourceFile().fileName,
        line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
        fix: 'Consider using an options object',
      });
    }
  }

  private analyzeClassComplexity(node: ts.ClassDeclaration): void {
    if (node.typeParameters && node.typeParameters.length > 3) {
      this.recommendations.push({
        type: 'maintainability',
        priority: 'high',
        description: 'Class has too many generic parameters',
        file: node.getSourceFile().fileName,
        line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
      });
    }

    // Check for complex inheritance
    if (node.heritageClauses) {
      node.heritageClauses.forEach(clause => {
        if (clause.types.length > 2) {
          this.recommendations.push({
            type: 'maintainability',
            priority: 'medium',
            description: 'Class extends too many types, consider composition',
            file: node.getSourceFile().fileName,
            line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
          });
        }
      });
    }
  }

  private analyzeTypeNode(node: ts.TypeNode): void {
    if (ts.isUnionTypeNode(node)) {
      this.metrics.unionTypes++;
      if (node.types.length > 5) {
        this.recommendations.push({
          type: 'maintainability',
          priority: 'medium',
          description: 'Union type has too many alternatives',
          file: node.getSourceFile().fileName,
          line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
          fix: 'Consider using discriminated unions or type guards',
        });
      }
    } else if (ts.isIntersectionTypeNode(node)) {
      this.metrics.intersectionTypes++;
      if (node.types.length > 3) {
        this.recommendations.push({
          type: 'maintainability',
          priority: 'medium',
          description: 'Intersection type is too complex',
          file: node.getSourceFile().fileName,
          line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
          fix: 'Consider simplifying the intersection or using type composition',
        });
      }
    } else if (ts.isMappedTypeNode(node)) {
      this.metrics.mappedTypes++;
    } else if (ts.isConditionalTypeNode(node)) {
      this.metrics.conditionalTypes++;
      if (this.isComplexConditionalType(node)) {
        this.recommendations.push({
          type: 'performance',
          priority: 'high',
          description: 'Complex conditional type may impact compilation performance',
          file: node.getSourceFile().fileName,
          line: ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.pos).line + 1,
          fix: 'Consider simplifying the conditional type or using type aliases',
        });
      }
    }

    ts.forEachChild(node, child => this.analyzeTypeNode(child));
  }

  private isComplexConditionalType(node: ts.ConditionalTypeNode): boolean {
    // Check for nested conditional types
    const checkDepth = (n: ts.Node, depth: number): boolean => {
      if (depth > 3) return true;
      if (ts.isConditionalTypeNode(n)) {
        return checkDepth(n.trueType, depth + 1) || checkDepth(n.falseType, depth + 1);
      }
      return false;
    };

    return checkDepth(node, 0);
  }

  private calculateOptimizationScore(): void {
    const totalTypes = this.metrics.complexTypes;
    const totalFiles = this.metrics.totalFiles;

    // Calculate complexity ratios
    const genericRatio = this.metrics.genericTypes / totalTypes;
    const unionRatio = this.metrics.unionTypes / totalTypes;
    const intersectionRatio = this.metrics.intersectionTypes / totalTypes;
    const conditionalRatio = this.metrics.conditionalTypes / totalTypes;

    // Calculate type inference score
    this.metrics.typeInferenceScore = this.calculateTypeInferenceScore();

    // Calculate optimization score (0-100)
    let score = 100;

    // Deduct points for complexity
    if (genericRatio > 0.3) score -= 10;
    if (unionRatio > 0.4) score -= 10;
    if (intersectionRatio > 0.2) score -= 10;
    if (conditionalRatio > 0.2) score -= 15;

    // Deduct points for recommendations
    const highPriorityRecs = this.recommendations.filter(r => r.priority === 'high').length;
    const mediumPriorityRecs = this.recommendations.filter(r => r.priority === 'medium').length;

    score -= highPriorityRecs * 10;
    score -= mediumPriorityRecs * 5;

    // Bonus points for good practices
    if (this.metrics.typeInferenceScore > 80) score += 10;
    if (totalFiles > 50 && this.metrics.complexTypes / totalFiles < 5) score += 10;

    this.metrics.optimizationScore = Math.max(0, Math.min(100, score));
  }

  private calculateTypeInferenceScore(): number {
    // This is a simplified calculation
    // In a real implementation, you would analyze actual type inference success rates
    const baseScore = 70;
    const complexityPenalty = this.metrics.conditionalTypes * 2;
    const genericBonus = Math.min(20, this.metrics.genericTypes * 0.5);

    return Math.max(0, Math.min(100, baseScore + genericBonus - complexityPenalty));
  }
}

// ==================== Optimization Suggestions ====================

class TypeOptimizer {
  private recommendations: OptimizationRecommendation[] = [];

  analyzeForOptimizations(filePath: string): OptimizationRecommendation[] {
    const content = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true
    );

    this.checkTypeOnlyImports(sourceFile);
    this.checkGenericConstraints(sourceFile);
    this.checkUtilityTypeUsage(sourceFile);
    this.checkTypeAliases(sourceFile);
    this.checkInterfaceExtensions(sourceFile);

    return this.recommendations;
  }

  private checkTypeOnlyImports(sourceFile: ts.SourceFile): void {
    const importStatements = sourceFile.statements.filter(
      s => ts.isImportDeclaration(s)
    );

    importStatements.forEach(imp => {
      if (imp.importClause && imp.importClause.namedBindings) {
        const namedBindings = imp.importClause.namedBindings;

        if (ts.isNamedImports(namedBindings)) {
          const typeOnlyImports = namedBindings.elements.filter(
            el => el.isTypeOnly
          );

          const totalImports = namedBindings.elements.length;
          const typeOnlyRatio = typeOnlyImports.length / totalImports;

          if (typeOnlyRatio < 0.3 && totalImports > 3) {
            this.recommendations.push({
              type: 'performance',
              priority: 'medium',
              description: 'Consider using type-only imports for better compilation performance',
              file: sourceFile.fileName,
              line: ts.getLineAndCharacterOfPosition(sourceFile, imp.pos).line + 1,
              fix: 'Add `type` keyword to import statements that only import types',
            });
          }
        }
      }
    });
  }

  private checkGenericConstraints(sourceFile: ts.SourceFile): void {
    const checkNode = (node: ts.Node) => {
      if (ts.isTypeParameterDeclaration(node)) {
        if (node.constraint && this.isComplexConstraint(node.constraint)) {
          this.recommendations.push({
            type: 'performance',
            priority: 'medium',
            description: 'Complex generic constraint may impact compilation performance',
            file: sourceFile.fileName,
            line: ts.getLineAndCharacterOfPosition(sourceFile, node.pos).line + 1,
            fix: 'Consider simplifying the constraint or using a base type',
          });
        }
      }
      ts.forEachChild(node, checkNode);
    };

    ts.forEachChild(sourceFile, checkNode);
  }

  private isComplexConstraint(constraint: ts.TypeNode): boolean {
    if (ts.isIntersectionTypeNode(constraint)) {
      return constraint.types.length > 2;
    }
    if (ts.isConditionalTypeNode(constraint)) {
      return true;
    }
    return false;
  }

  private checkUtilityTypeUsage(sourceFile: ts.SourceFile): void {
    const utilityTypes = ['Pick', 'Omit', 'Partial', 'Required', 'Record', 'Exclude', 'Extract'];

    const checkNode = (node: ts.Node) => {
      if (ts.isTypeReferenceNode(node)) {
        const typeName = node.typeName.getText(sourceFile);

        if (utilityTypes.includes(typeName)) {
          // Check for complex arguments
          if (node.typeArguments && node.typeArguments.length > 2) {
            this.recommendations.push({
              type: 'maintainability',
              priority: 'low',
              description: 'Utility type has multiple type arguments',
              file: sourceFile.fileName,
              line: ts.getLineAndCharacterOfPosition(sourceFile, node.pos).line + 1,
            });
          }
        }
      }
      ts.forEachChild(node, checkNode);
    };

    ts.forEachChild(sourceFile, checkNode);
  }

  private checkTypeAliases(sourceFile: ts.SourceFile): void {
    const typeAliases = sourceFile.statements.filter(
      s => ts.isTypeAliasDeclaration(s)
    );

    typeAliases.forEach(alias => {
      if (ts.isTypeAliasDeclaration(alias)) {
        const typeText = alias.type.getText(sourceFile);

        if (typeText.length > 200) {
          this.recommendations.push({
            type: 'maintainability',
            priority: 'medium',
            description: 'Type alias is too complex, consider breaking it down',
            file: sourceFile.fileName,
            line: ts.getLineAndCharacterOfPosition(sourceFile, alias.pos).line + 1,
          });
        }
      }
    });
  }

  private checkInterfaceExtensions(sourceFile: ts.SourceFile): void {
    const interfaces = sourceFile.statements.filter(
      s => ts.isInterfaceDeclaration(s)
    );

    interfaces.forEach(iface => {
      if (ts.isInterfaceDeclaration(iface) && iface.heritageClauses) {
        iface.heritageClauses.forEach(clause => {
          if (clause.types.length > 3) {
            this.recommendations.push({
              type: 'maintainability',
              priority: 'medium',
              description: 'Interface extends too many types',
              file: sourceFile.fileName,
              line: ts.getLineAndCharacterOfPosition(sourceFile, iface.pos).line + 1,
              fix: 'Consider using composition or reducing interface hierarchy',
            });
          }
        });
      }
    });
  }
}

// ==================== Performance Report Generator ====================

class PerformanceReportGenerator {
  generateReport(metrics: PerformanceMetrics, recommendations: OptimizationRecommendation[]): string {
    const report = [
      'TypeScript Performance Analysis Report',
      '====================================',
      '',
      'Metrics:',
      `  Total Files: ${metrics.totalFiles}`,
      `  Total Lines: ${metrics.totalLines}`,
      `  Complex Types: ${metrics.complexTypes}`,
      `  Generic Types: ${metrics.genericTypes}`,
      `  Union Types: ${metrics.unionTypes}`,
      `  Intersection Types: ${metrics.intersectionTypes}`,
      `  Mapped Types: ${metrics.mappedTypes}`,
      `  Conditional Types: ${metrics.conditionalTypes}`,
      `  Type Inference Score: ${metrics.typeInferenceScore}/100`,
      `  Optimization Score: ${metrics.optimizationScore}/100`,
      '',
      'Recommendations:',
      ...this.formatRecommendations(recommendations),
      '',
      'Optimization Suggestions:',
      ...this.generateOptimizationSuggestions(metrics),
    ];

    return report.join('\n');
  }

  private formatRecommendations(recommendations: OptimizationRecommendation[]): string[] {
    const formatted: string[] = [];

    const byPriority = recommendations.reduce((acc, rec) => {
      if (!acc[rec.priority]) acc[rec.priority] = [];
      acc[rec.priority].push(rec);
      return acc;
    }, {} as Record<string, OptimizationRecommendation[]>);

    ['high', 'medium', 'low'].forEach(priority => {
      if (byPriority[priority]) {
        formatted.push(`  ${priority.toUpperCase()} Priority:`);
        byPriority[priority].forEach(rec => {
          formatted.push(`    - ${rec.description} (${rec.file}:${rec.line || 0})`);
          if (rec.fix) {
            formatted.push(`      Fix: ${rec.fix}`);
          }
        });
        formatted.push('');
      }
    });

    return formatted;
  }

  private generateOptimizationSuggestions(metrics: PerformanceMetrics): string[] {
    const suggestions: string[] = [];

    if (metrics.genericTypes / metrics.complexTypes > 0.3) {
      suggestions.push('  - Consider reducing generic type usage for better compilation performance');
    }

    if (metrics.unionTypes / metrics.complexTypes > 0.4) {
      suggestions.push('  - Large union types may impact performance, consider using discriminated unions');
    }

    if (metrics.conditionalTypes > 10) {
      suggestions.push('  - Many conditional types may slow down compilation, consider simplifying');
    }

    if (metrics.typeInferenceScore < 70) {
      suggestions.push('  - Type inference score is low, consider adding explicit type annotations');
    }

    if (metrics.optimizationScore < 70) {
      suggestions.push('  - Overall optimization score is low, consider implementing the recommendations above');
    }

    return suggestions.length > 0 ? suggestions : ['  - No major optimization opportunities found'];
  }
}

// ==================== Main Analysis Function ====================

export function analyzeTypePerformance(projectPath: string): {
  metrics: PerformanceMetrics;
  recommendations: OptimizationRecommendation[];
  report: string;
} {
  const analyzer = new TypeComplexityAnalyzer();
  const optimizer = new TypeOptimizer();
  const reportGenerator = new PerformanceReportGenerator();

  console.log('Analyzing TypeScript performance...');
  console.log(`Project path: ${projectPath}`);

  // Analyze overall complexity
  const metrics = analyzer.analyzeDirectory(projectPath);
  const recommendations = analyzer.getRecommendations();

  // Analyze specific files for optimizations
  const tsFiles = new TypeComplexityAnalyzer()['getTsFiles'](projectPath);
  tsFiles.forEach(file => {
    const fileRecommendations = optimizer.analyzeForOptimizations(file);
    recommendations.push(...fileRecommendations);
  });

  // Generate report
  const report = reportGenerator.generateReport(metrics, recommendations);

  return {
    metrics,
    recommendations,
    report,
  };
}

// ==================== CLI Interface ====================

if (require.main === module) {
  const projectPath = process.argv[2] || process.cwd();

  try {
    const result = analyzeTypePerformance(projectPath);

    console.log('\n' + result.report);

    if (result.metrics.optimizationScore < 70) {
      console.log('\n⚠️  Consider implementing the recommendations above to improve performance.');
      process.exit(1);
    } else {
      console.log('\n✅ TypeScript performance is good!');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error analyzing performance:', error);
    process.exit(1);
  }
}

export { TypeComplexityAnalyzer, TypeOptimizer, PerformanceReportGenerator };